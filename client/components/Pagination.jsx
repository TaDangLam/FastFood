import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa";

const Pagination = ({ totalProduct, productsPerPage, setCurrentPage, currentPage }) => {
    const totalPages = Math.ceil(totalProduct / productsPerPage);
    const pagesToShow = Math.min(5, totalPages); // Số lượng trang tối đa được hiển thị

    const toLeft = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const toRight = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const renderPageButtons = () => {
        const buttons = [];

        // Tính chỉ số bắt đầu và kết thúc của các trang cần hiển thị
        let startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
        let endPage = Math.min(totalPages, startPage + pagesToShow - 1);

        // Đảm bảo có đủ số lượng trang để hiển thị
        if (endPage - startPage + 1 < pagesToShow) {
            startPage = Math.max(1, endPage - pagesToShow + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            buttons.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`border p-3 ${i === currentPage ? 'bg-[#ffc139] text-white' : 'bg-gray-200 text-gray-700'} hover:bg-[#ffc139] hover:text-white`}
                    disabled={i === currentPage}
                >
                    {i}
                </button>
            );
        }

        return buttons;
    };

    return (
        <div className="flex gap-2">
            <button onClick={toLeft} disabled={currentPage === 1}><FaAngleLeft /></button>
            {renderPageButtons()}
            <button onClick={toRight} disabled={currentPage === totalPages}><FaAngleRight /></button>
        </div>
    );
};
 
export default Pagination;