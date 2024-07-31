import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '~/components/Button';
import { Input } from '~/components/Form';
import { PulseLoader } from 'react-spinners';
import { Radio } from '~/components/Checkbox';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import SettingService from '~/services/setting.service';

const schema = Yup.object({
    MAIL_HOST: Yup.string().required('Mail host is required'),
    MAIL_PORT: Yup.string().required('Mail port is required'),
    MAIL_USERNAME: Yup.string().required('Mail username is required'),
    MAIL_PASSWORD: Yup.string().required('Mail password is required'),
    MAIL_AUTH: Yup.boolean().required('Mail auth is required'),
    MAIL_SECURED: Yup.boolean().required('Mail secure is required'),
    MAIL_FROM: Yup.string().required('Mail from is required'),
    MAIL_SENDER_NAME: Yup.string().required('Mail sender name is required'),
});
function Settings() {
    const [loading, setLoading] = useState(false);
    const [settings, setSettings] = useState([]);
    const {
        control,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema),
        defaultValues: {
            MAIL_HOST: settings?.MAIL_HOST || '',
            MAIL_PORT: settings?.MAIL_PORT || '',
            MAIL_USERNAME: settings?.MAIL_USERNAME || '',
            MAIL_PASSWORD: settings?.MAIL_PASSWORD || '',
            MAIL_AUTH: settings?.MAIL_AUTH || '',
            MAIL_SECURED: settings?.MAIL_SECURED || '',
            MAIL_FROM: settings?.MAIL_FROM || '',
            MAIL_SENDER_NAME: settings?.MAIL_SENDER_NAME || '',
        },
    });

    // fetch settings
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

                setSettings(settingsObject);

                // set form values
                Object.entries(settingsObject).forEach(([key, value]) => {
                    setValue(key, value);
                });
            } catch (error) {
                console.error(`Error fetching settings: ${error.message}`);
                toast.error('Error fetching settings', {
                    pauseOnHover: false,
                });
            }
        };

        fetchSettings();
    }, []);

    useEffect(() => {
        const arrErrors = Object.values(errors);
        if (arrErrors.length > 0) {
            toast.error(arrErrors[0]?.message, {
                pauseOnHover: false,
            });
        }
    }, [errors]);

    const watchMailAuth = watch('MAIL_AUTH');
    const watchMailSecure = watch('MAIL_SECURED');
    const onSubmit = async (data) => {
       try {
        setLoading(true);
        const res = await SettingService.updateSetting(data);
        setLoading(false);
        if (res.status === 200) {
            toast.success('Setting updated successfully', {
                pauseOnHover: false,
            });
        }
       }catch(error) {
        console.log("🚀 ~ onSubmit ~ error:", error)
        
       }
    };

    return (
        <div>
            <h1 className="text-primary font-medium text-2xl text-center mb-10">Setting mail sender</h1>
            <form action="" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-3 gap-x-10 mb-10">
                    <Input label="Mail host" name="MAIL_HOST" control={control} placeholder="mail sender info..." />
                    <Input label="Mail PORT" name="MAIL_PORT" control={control} placeholder="mail sender info..." />
                    <Input
                        label="Mail username"
                        name="MAIL_USERNAME"
                        control={control}
                        placeholder="mail sender info..."
                    />
                </div>
                <div className="grid grid-cols-3 gap-x-10 mb-10">
                    <Input
                        label="Mail password"
                        name="MAIL_PASSWORD"
                        type="password"
                        control={control}
                        placeholder="mail sender info..."
                    />
                    <Input label="Mail From" name="MAIL_FROM" control={control} placeholder="mail sender info..." />
                    <Input
                        label="Mail sender"
                        name="MAIL_SENDER_NAME"
                        control={control}
                        placeholder="mail sender info..."
                    />
                </div>

                <div className="grid grid-cols-3 gap-x-10 mb-10">
                    <div className="flex justify-between">
                        <div>
                            <label htmlFor="">Mail auth</label>
                            <div className="flex gap-x-4 mt-4">
                                <Radio
                                    type="radio"
                                    name="MAIL_AUTH"
                                    control={control}
                                    checked={watchMailAuth === 'true'}
                                    value={true}
                                >
                                    True
                                </Radio>
                                <Radio
                                    type="radio"
                                    name="MAIL_AUTH"
                                    control={control}
                                    checked={watchMailAuth === 'false'}
                                    value={false}
                                >
                                    False
                                </Radio>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="">Mail auth</label>
                            <div className="flex gap-x-4 mt-4">
                                <Radio
                                    type="radio"
                                    name="MAIL_SECURED"
                                    control={control}
                                    checked={watchMailSecure === 'true'}
                                    value={true}
                                >
                                    True
                                </Radio>
                                <Radio
                                    type="radio"
                                    name="MAIL_SECURED"
                                    control={control}
                                    checked={watchMailSecure === 'false'}
                                    value={false}
                                >
                                    False
                                </Radio>
                            </div>
                        </div>
                    </div>
                </div>

                <Button primary>{loading ? <PulseLoader color="#fff" size={8} /> : 'Submit'}</Button>
            </form>
        </div>
    );
}

export default Settings;
