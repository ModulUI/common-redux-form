import React from 'react';
import PropTypes from 'prop-types';
import { DropZone } from 'modul-components';


class UploadField extends React.Component {
	static propTypes = {
		name: PropTypes.string,
		loading: PropTypes.bool,
		error: PropTypes.bool,
		isLoad: PropTypes.bool,
		fileLink: PropTypes.string,
		fileName: PropTypes.string,
		fileDescription: PropTypes.string,
		children: PropTypes.element,
		onLoading: PropTypes.func
	};

	onOpenFile = () => {
		this.fileZone.open();
	};

	onDragStart = files => {
		this.props.onLoading(files[0]);
	};

	render() {
		const {
			name,
			loading,
			error,
			isLoad,
			fileLink,
			fileName,
			fileDescription,
			children
		} = this.props;

		const cssClass = (loading && 'loading_block' || '') + (error && 'error' || '');

		return (
			<DropZone
        getRef={(r) => {
          this.fileZone = r;
        }}
				disableClick
				name={name}
				onDrop={this.onDragStart}
				className={`col five`}
				accept="image/jpeg, image/png, application/pdf"
      >
				{() => {
					if (isLoad) {
						return (
							<div className={`file_upload_block col full ${cssClass}`}>
								<div className='uploaded'>
									<div className='file_center'>
										<div className='file_icon jpg' />
										<div className="file_name">
											<a href={fileLink} target='_blank'>{fileName}</a>
										</div>
										<div className='file_title'>{fileDescription}</div>
									</div>
								</div>
							</div>
						);
					}
					return (
						<div className={`file_upload_block col full ${cssClass}`}>
							{children}
							<div className='file_button' onClick={this.onOpenFile}>
								<label className='button light icon-upload small button_file_upload'>
									Загрузить
								</label>
							</div>
						</div>
					);
				}}
			</DropZone>
		);
	}
}

export { UploadField };
