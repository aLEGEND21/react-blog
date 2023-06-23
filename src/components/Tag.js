import { MdOutlineCancel } from 'react-icons/md';
import { PiHashLight } from 'react-icons/pi';
import '../scss/Tag.scss';

function Tag(props) {
    let removeBtn;
    if (props.handleRemove) {
        removeBtn = (
            <MdOutlineCancel className='tag-remove-icon ms-1' onClick={props.handleRemove(props.value)} />
        );
    }

    return (
        <div className='tag d-inline-block rounded bg-primary border border-primary text-white me-2 px-2 py-1'>
            <PiHashLight className='tag-hash-icon'/>
            {props.value}
            {removeBtn}
        </div>
    );
}

export default Tag;