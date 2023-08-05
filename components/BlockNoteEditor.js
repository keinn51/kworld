import 'react-quill/dist/quill.snow.css';
import ReactQuill, { Quill } from 'react-quill';
import styles from '@/styles/components/QuillEditor.module.scss';

export default function QuillEditor({ id = '', value = '', onChange = () => {} }) {
    return <ReactQuill id={styles[id]} value={value} onChange={onChange} theme="snow" />;
}
