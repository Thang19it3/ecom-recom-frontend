import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "react-feather"

export default function Carousel({ children: slides}){
    const [curr, setCurr] = useState(0)
    const prev = () => setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1))
    const next = () => setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1))
    const slideWidth = 100;

    useEffect(() => {
         let prevCurr = 0;
        const interval = setInterval(() => {
            if (prevCurr === slides.length - 1) {
                prevCurr = 0;
            } else {
                prevCurr++;
            }
            setCurr(prevCurr);
        }, 3000); // Thay đổi 3000 thành thời gian bạn muốn chuyển đổi giữa các slide (đơn vị milliseconds)

        return () => {
            clearInterval(interval);
        };
    }, [slides.length])

    const slideStyle = {
        transform: `translateX(-${curr * slideWidth}%)`,
        transition: "transform 0.5s ease-out"
    };
    return (
        <div className = "position-relative overflow-hidden img-carousel" >
            <div className="d-flex transition-transform ease-out duration-500" style={{ ...slideStyle }}>{slides}</div>
            <div className = "position-absolute top-0 bottom-0 start-0 end-0 d-flex justify-content-between align-items-center p-4" >
                <button className="prev" onClick={prev}>
                    <ChevronLeft size={40} />
                </button>
                <button className="next" onClick={next}>
                    <ChevronRight size={40} />
                </button>
            </div>
        </div>
    )
}