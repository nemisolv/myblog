import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Input } from '~/components/Form';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import { toast } from 'react-toastify';
import SettingService from '~/services/setting.service';
import Button from '~/components/Button';

function MailTemplate() {
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const settingsArray = await SettingService.getSetting();
                const settingsObject = settingsArray.reduce(
                    (obj, item) => ({
                        ...obj,
                        [item.key]: item.value,
                    }),
                    {},
                );

                setTitle(settingsObject.CUSTOMER_VERIFY_ACC_SUBJECT);
                setContent(settingsObject.CUSTOMER_VERIFY_ACC_CONTENT);
            } catch (error) {
                console.error(`Error fetching settings: ${error.message}`);
                toast.error('Error fetching settings', {
                    pauseOnHover: false,
                });
            }
        };

        fetchSettings();
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await SettingService.updateMailTemplate({
                CUSTOMER_VERIFY_ACC_SUBJECT: title,
                CUSTOMER_VERIFY_ACC_CONTENT: content,
            });

            if (res) {
                toast.success('Mail template updated successfully', {
                    pauseOnHover: false,
                });
            }
        } catch (error) {
            console.error(`Error updating mail template: ${error.message}`);
            toast.error('Error updating mail template', {
                pauseOnHover: false,
            });
        }
    };

    return (
        <div>
            <h1 className="text-primary font-medium text-2xl text-center mb-10">Setting mail Template</h1>

            <form action="" onSubmit={onSubmit}>
                <div>
                    <label htmlFor="">Verification email subject</label>
                    <input className="border rounded-lg py-2 px-6 block w-1/4 my-4" type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
                </div>
                <label htmlFor=""></label>
                <div className="flex flex-col gap-y-4 entry-content mb-10">
                    <label className="">Content</label>
                    <ReactQuill theme="snow" value={content} onChange={setContent}  />
                </div>
                <Button primary>Submit</Button>
            </form>
        </div>
    );
}
export default MailTemplate;
