import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function NotifyMessage(unchanged=false,redirect='/',message) {
const navigate = useNavigate();
    toast.error(message, {
        pauseOnHover: false,
    });
   if(!unchanged) navigate(redirect);
}

export default NotifyMessage;