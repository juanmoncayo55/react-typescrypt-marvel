type ModalMarvelInfoProps = {
	titleSection: any,
	numberInfo: any,
	displayInfo: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, idTitle: string) => void
}
export default function ModalMarvelInfo({titleSection, numberInfo, displayInfo} : ModalMarvelInfoProps){
	return (
		<li className="modal-text">
			<div className="modal-text-inter">
				{titleSection}: <span>{numberInfo}</span>
				<a href="#" onClick={(e) => displayInfo(e, titleSection)}>
					<img src="/eye-solid.svg" className="modal-eye-img" />
				</a>
			</div>
		</li>
	)
}