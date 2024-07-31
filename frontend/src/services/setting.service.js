const { axiosPrivate } = require('~/config/axiosConfig');

class SettingService {
    static async getSetting() {
        try {
            const res = await axiosPrivate.get('/settings/mail');

            return res.data;
        } catch (error) {
            console.error(`Error in getSetting: ${error.message}`);
            throw error;
        }
    }

    static async updateSetting(data) {
        try {
            const res = await axiosPrivate.patch('/settings/mail-server', data);

            return res;
        } catch (error) {
            console.error(`Error in updateSetting: ${error.message}`);
            throw error;
        }
    }
    static async updateMailTemplate(data) {
        try {
            const res = await axiosPrivate.patch('/settings/mail-template', data);

            return res;
        } catch (error) {
            console.error(`Error in updateSetting: ${error.message}`);
            throw error;
        }
    }
}

export default SettingService;
