import React from 'react';
import { Backdrop, Box, Modal, Fade } from '@mui/material';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	maxWidth: 450,
	width: '100%',
	bgcolor: 'background.paper',
	border: '2px solid transparent',
	borderRadius: '10px',
	boxShadow: 24,
	p: 4,
};

export default function CustomModal({ isOpen, handleClose, children }) {
	return (
		<div>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				open={isOpen}
				onClose={handleClose}
				closeAfterTransition
				slots={{ backdrop: Backdrop }}
				slotProps={{
					backdrop: {
						timeout: 500,
					},
				}}
			>
				<Fade in={isOpen}>
					<Box sx={style}>{children}</Box>
				</Fade>
			</Modal>
		</div>
	);
}
