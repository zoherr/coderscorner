import React, { FC } from 'react';
import { Modal, Box } from "@mui/material"
import login from '@/components/Auth-cc/login';
type Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
    activeItem?: any;
    component: any;
    setRoute?: (route: string) => void;
}

const CustomModal: FC<Props> = ({ open, setOpen, setRoute, component: Component }) => {
    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby='modal-modal-description'
        >
            <Box className="animate_top shadow-xl absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white  rounded-[15px] backdrop-blur-[0.5rem] pt-4 pb-5 outline-none  px-7 " sx={{
                "@media (max-width: 767px)": {
                    margin: "auto",
                    width: "90%",
                    padding: "1.75rem",
                },
                "@media (min-width: 768px)": {
                    margin: "0",
                },
            }}>
                <Component setOpen={setOpen} setRoute={setRoute} />
            </Box>
        </Modal>
    );
}

export default CustomModal;
