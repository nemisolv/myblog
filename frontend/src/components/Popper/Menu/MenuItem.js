import PropTypes from 'prop-types';
import Button from '~/components/Button';


function MenuItem({ data, onClick }) {
    return (
        <Button
            className="flex items-center  gap-x-6 pl-10 py-2 hover:bg-[#16182308] w-full"
            to={data.path}
            onClick={onClick}
        >
            {data.icon} {data.title}
        </Button>
    );
}

MenuItem.propTypes = {
    data: PropTypes.object.isRequired,
    onClick: PropTypes.func,
};

export default MenuItem;
