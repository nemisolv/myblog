import PropTypes from 'prop-types';

function Wrapper({ children, className }) {
    return (
        <div className=" flex flex-col w-full max-h-[calc((100vh - 96px) - 60px)] max-h-[734px] min-h-[100px] py-2  rounded-lg bg-white shadow-md">
            {children}
        </div>
    );
}

Wrapper.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};

export default Wrapper;
