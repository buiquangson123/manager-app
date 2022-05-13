import { useRef } from "react";
import { department } from "../../api/department";



export interface OverLay {
    showOverlay: boolean,
    setShowOverlay: (isShow: boolean) => void,
    handleDeleteUser: (id: number) => void,
    listDepart: department[],
    children: any,
    add: boolean,
    setAdd: (add: boolean) => void,
    showDelete: boolean,
    setShowDelete: (showDele: boolean) => void,
    edit: boolean,
    setEdit: (edit: boolean) => void
}

const Overlay = ({ children, showOverlay, setShowOverlay, handleDeleteUser, add, setAdd, showDelete, setShowDelete, edit, setEdit }: OverLay) => {
    const showRef: any = useRef(null);

    const handleOutClick = (e: any) => {
        // showRef.current && !showRef.current.contains(e.target) &&
        if (e.target === showRef.current) {
            setShowOverlay(false);
            if (add) setAdd(!add)
            if (showDelete) setShowDelete(!showDelete)
            if (edit) setEdit(!edit)
        }
    };

    const handleSubmit = () => {
        if (localStorage.getItem("idDelete") !== null) handleDeleteUser(parseInt(localStorage.getItem("idDelete") as any))
        setShowOverlay(!showOverlay)
        if (!showOverlay) localStorage.removeItem("idDelete")
    }

    return (
        showOverlay ? (
            <div
                className="overlay-btn bg-opacity-30 bg-slate-400 top-0 left-0 right-0 bottom-0 w-full h-full z-10 fixed block"
                ref={showRef}
                onClick={(e: any) => handleOutClick(e)}
            >
            {children}
            </div>
        ) : <div></div>
    );
};

export default Overlay;
