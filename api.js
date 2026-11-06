/**
 * Unified API Client for ระบบจัดครูสอนแทน (Thai Substitute System)
 * Supports: Cloudflare Workers REST API -> Google Apps Script Fallback -> LocalStorage Offline
 */
(function(window) {
  const config = window.SUB_APP_CONFIG || {};

  class SubstituteApiClient {
    constructor() {
      this.cfUrl = (config.CLOUDFLARE_API_URL || "").trim().replace(/\/$/, "");
      this.gasUrl = (config.APPS_SCRIPT_URL || "").trim();
      this.mode = config.MODE || "auto";
      this.activeBackend = "checking";
    }

    /**
     * ดึงข้อมูลประวัติการสอนแทนทั้งหมด
     */
    async getHistory() {
      // 1. ลองเชื่อมต่อ Cloudflare Worker ก่อน (ถ้ามี URL)
      if (this.cfUrl && (this.mode === 'auto' || this.mode === 'cloudflare')) {
        try {
          const res = await fetch(`${this.cfUrl}/api/history`, {
            method: 'GET',
            headers: { 'Accept': 'application/json' }
          });
          if (res.ok) {
            const data = await res.json();
            this.activeBackend = "cloudflare";
            this.saveLocalCache(data);
            return { success: true, status: 'success', data: data, source: 'cloudflare' };
          }
        } catch (cfErr) {
          console.warn('[API] Cloudflare Worker unreachable, trying fallback...', cfErr);
        }
      }

      // 2. ลองเชื่อมต่อ Google Apps Script Web App
      if (this.gasUrl && (this.mode === 'auto' || this.mode === 'appsscript')) {
        try {
          const separator = this.gasUrl.includes('?') ? '&' : '?';
          const res = await fetch(`${this.gasUrl}${separator}action=getHistory`, {
            method: 'GET'
          });
          if (res.ok) {
            const data = await res.json();
            this.activeBackend = "appsscript";
            this.saveLocalCache(data);
            return { success: true, status: 'success', data: data, source: 'appsscript' };
          }
        } catch (gasErr) {
          console.warn('[API] Apps Script unreachable, falling back to LocalStorage...', gasErr);
        }
      }

      // 3. Fallback: ดึงจาก LocalStorage ในเครื่อง
      this.activeBackend = "local";
      const localData = this.getLocalCache();
      return { 
        success: true, 
        status: 'success',
        data: localData, 
        source: 'local',
        warning: 'กำลังทำงานในโหมด Offline / Local Cache' 
      };
    }

    /**
     * บันทึกรายการสอนแทนใหม่
     */
    async saveSubstitution(subData) {
      // 1. Cloudflare Worker
      if (this.cfUrl && (this.mode === 'auto' || this.mode === 'cloudflare')) {
        try {
          const res = await fetch(`${this.cfUrl}/api/save`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(subData)
          });
          if (res.ok) {
            const resData = await res.json();
            this.syncSaveLocal(subData);
            return { success: true, status: 'success', data: resData, source: 'cloudflare' };
          }
        } catch (e) {
          console.warn('[API] Cloudflare save failed, falling back...', e);
        }
      }

      // 2. Google Apps Script Web App
      if (this.gasUrl && (this.mode === 'auto' || this.mode === 'appsscript')) {
        try {
          const res = await fetch(this.gasUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify({ action: 'save', data: subData })
          });
          if (res.ok) {
            const resData = await res.json();
            this.syncSaveLocal(subData);
            return { success: true, status: 'success', data: resData, source: 'appsscript' };
          }
        } catch (e) {
          console.warn('[API] Apps Script save failed, saving locally...', e);
        }
      }

      // 3. บันทึกใน LocalStorage
      this.syncSaveLocal(subData);
      return { success: true, status: 'success', message: 'บันทึกในเครื่องเรียบร้อย (ออฟไลน์)', source: 'local' };
    }

    /**
     * อัปเดตเปลี่ยนครูสอนแทนสำหรับคาบใดคาบหนึ่ง
     */
    async updateSubstitute(id, period, subTeacherId, subTeacherName) {
      const payload = {
        action: 'updateSubstitute',
        id: id,
        period: period,
        subTeacherId: subTeacherId,
        subTeacherName: subTeacherName
      };

      if (this.cfUrl && (this.mode === 'auto' || this.mode === 'cloudflare')) {
        try {
          const res = await fetch(`${this.cfUrl}/api/substitute`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
          if (res.ok) {
            const data = await res.json();
            return { status: 'success', ...data };
          }
        } catch (e) {
          console.warn('[API] Cloudflare update failed', e);
        }
      }

      if (this.gasUrl && (this.mode === 'auto' || this.mode === 'appsscript')) {
        try {
          const res = await fetch(this.gasUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify(payload)
          });
          if (res.ok) {
            const data = await res.json();
            return { status: 'success', ...data };
          }
        } catch (e) {
          console.warn('[API] Apps Script update failed', e);
        }
      }

      return { status: 'success', message: 'อัปเดตในเครื่องเรียบร้อย' };
    }

    /**
     * ลบรายการสอนแทน
     */
    async deleteSubstitution(id) {
      if (this.cfUrl && (this.mode === 'auto' || this.mode === 'cloudflare')) {
        try {
          const res = await fetch(`${this.cfUrl}/api/substitute/${id}`, {
            method: 'DELETE'
          });
          if (res.ok) {
            const data = await res.json();
            return { status: 'success', ...data };
          }
        } catch (e) {
          console.warn('[API] Cloudflare delete failed', e);
        }
      }

      if (this.gasUrl && (this.mode === 'auto' || this.mode === 'appsscript')) {
        try {
          const res = await fetch(this.gasUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify({ action: 'delete', id: id })
          });
          if (res.ok) {
            const data = await res.json();
            return { status: 'success', ...data };
          }
        } catch (e) {
          console.warn('[API] Apps Script delete failed', e);
        }
      }

      return { status: 'success', message: 'ลบในเครื่องเรียบร้อย' };
    }

    // Local Storage Helpers
    getLocalCache() {
      try {
        const item = localStorage.getItem('sub_history');
        return item ? JSON.parse(item) : [];
      } catch (e) {
        return [];
      }
    }

    saveLocalCache(data) {
      try {
        localStorage.setItem('sub_history', JSON.stringify(data));
      } catch (e) {
        console.warn('LocalStorage save error', e);
      }
    }

    syncSaveLocal(subData) {
      const history = this.getLocalCache();
      history.unshift(subData);
      this.saveLocalCache(history);
    }
  }

  window.SubstituteApi = new SubstituteApiClient();
})(window);
