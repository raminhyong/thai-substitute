/**
 * Cloudflare Worker Backend for ระบบจัดครูสอนแทน (กลุ่มสาระการเรียนรู้ภาษาไทย)
 * โรงเรียนพูลเจริญวิทยาคม
 * 
 * รองรับทั้ง:
 * 1. Cloudflare D1 Database (แนะนำ - SQL ฐานข้อมูลเร็วสูง ฟรี)
 * 2. Cloudflare KV / In-Memory Mock
 * 3. Proxy ไปยัง Google Sheets
 */

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const method = request.method;

    // CORS Headers เพื่อให้ Frontend บน HostAtom เรียกใช้ได้แบบไม่มีติดขัด
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Content-Type': 'application/json;charset=UTF-8'
    };

    // Handle CORS Preflight
    if (method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    try {
      // 1. GET /api/health
      if (url.pathname === '/api/health') {
        return new Response(JSON.stringify({
          status: 'ok',
          service: 'ระบบจัดครูสอนแทน API (Cloudflare Worker)',
          time: new Date().toISOString(),
          d1Available: !!env.DB
        }), { headers: corsHeaders });
      }

      // 2. GET /api/history
      if (url.pathname === '/api/history' && method === 'GET') {
        if (env.DB) {
          const { results } = await env.DB.prepare(
            `SELECT * FROM substitution_logs ORDER BY date DESC, period ASC`
          ).all();
          return new Response(JSON.stringify(results || []), { headers: corsHeaders });
        } else if (env.SUB_KV) {
          const data = await env.SUB_KV.get('history', { type: 'json' });
          return new Response(JSON.stringify(data || []), { headers: corsHeaders });
        } else {
          // Mock data fallback if D1/KV not yet bound
          return new Response(JSON.stringify([]), { headers: corsHeaders });
        }
      }

      // 3. POST /api/save
      if (url.pathname === '/api/save' && method === 'POST') {
        const payload = await request.json();
        const records = Array.isArray(payload) ? payload : [payload];

        if (env.DB) {
          const stmt = env.DB.prepare(`
            INSERT INTO substitution_logs (id, date, day, absentTeacherId, absentTeacherName, period, subject, subjectCode, class, room, subTeacherId, subTeacherName, reason, workType, timestamp)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
          `);

          const batch = [];
          for (const item of records) {
            // If item has nested substitutes array
            if (item.substitutes && Array.isArray(item.substitutes)) {
              for (const sub of item.substitutes) {
                batch.push(stmt.bind(
                  item.id, item.date, item.day, item.absentTeacherId, item.absentTeacherName,
                  sub.period, sub.subject, sub.subjectCode || '', sub.class, sub.room,
                  sub.subTeacherId, sub.subTeacherName, item.reason || '', item.workType || 'ภาษาไทย'
                ));
              }
            } else {
              batch.push(stmt.bind(
                item.id, item.date, item.day, item.absentTeacherId, item.absentTeacherName,
                item.period, item.subject, item.subjectCode || '', item.class, item.room,
                item.subTeacherId, item.subTeacherName, item.reason || '', item.workType || 'ภาษาไทย'
              ));
            }
          }
          await env.DB.batch(batch);
        } else if (env.SUB_KV) {
          const current = (await env.SUB_KV.get('history', { type: 'json' })) || [];
          current.unshift(...records);
          await env.SUB_KV.put('history', JSON.stringify(current));
        }

        return new Response(JSON.stringify({ status: 'success', message: 'บันทึกสำเร็จ' }), { headers: corsHeaders });
      }

      // 4. PUT /api/substitute
      if (url.pathname === '/api/substitute' && method === 'PUT') {
        const { id, period, subTeacherId, subTeacherName } = await request.json();
        if (env.DB) {
          await env.DB.prepare(`
            UPDATE substitution_logs 
            SET subTeacherId = ?, subTeacherName = ?
            WHERE id = ? AND period = ?
          `).bind(subTeacherId, subTeacherName, id, period).run();
        }
        return new Response(JSON.stringify({ status: 'success', message: 'อัปเดตผู้สอนแทนสำเร็จ' }), { headers: corsHeaders });
      }

      // 5. DELETE /api/substitute/:id
      if (url.pathname.startsWith('/api/substitute/') && method === 'DELETE') {
        const id = url.pathname.split('/').pop();
        if (env.DB) {
          await env.DB.prepare(`DELETE FROM substitution_logs WHERE id = ?`).bind(id).run();
        } else if (env.SUB_KV) {
          let current = (await env.SUB_KV.get('history', { type: 'json' })) || [];
          current = current.filter(item => item.id !== id);
          await env.SUB_KV.put('history', JSON.stringify(current));
        }
        return new Response(JSON.stringify({ status: 'success', message: 'ลบรายการสำเร็จ' }), { headers: corsHeaders });
      }

      return new Response(JSON.stringify({ status: 'error', message: 'Not Found' }), { status: 404, headers: corsHeaders });
    } catch (err) {
      return new Response(JSON.stringify({ status: 'error', message: err.message }), { status: 500, headers: corsHeaders });
    }
  }
};
