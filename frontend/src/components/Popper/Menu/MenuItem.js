import PropTypes from 'prop-types';
function MenuItem({ data, onClick }) {
    return (
        <div
            className="flex items-center  gap-x-6 pl-10 py-2 hover:bg-[#16182308] w-full cursor-pointer"
            to={data.path}
            onClick={onClick}
        >
            {data.icon} {data.title}
        </div>
    );
}

MenuItem.propTypes = {
    data: PropTypes.object.isRequired,
    onClick: PropTypes.func,
};

export default MenuItem;
