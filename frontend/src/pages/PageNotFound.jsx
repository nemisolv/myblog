import { useNavigate } from 'react-router-dom';
import Button from '@/components/Button';

function PageNotFound() {
    const navigate = useNavigate();
    return (
        <div id="page-not-found" className="relative">
            <div className="text-center absolute bottom-[200px] flex flex-col gap-5 ">
                <h2 className="font-medium">Opps! Page not found </h2>
                <p>Something went wrong. Page not found</p>
                <Button onClick={() => navigate(-1)}>Go back</Button>
            </div>
        </div>
    );
}

export default PageNotFound;
