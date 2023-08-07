import 'react-quill/dist/quill.snow.css';
import ReactQuill, { Quill } from 'react-quill';
import styles from '@/styles/components/QuillEditor.module.scss';
import { useMemo, useRef } from 'react';

export default function QuillEditor({ id = '', value = '', onChange = () => {} }) {
    const quillRef = useRef();

    const imageHandler = (e) => {
        const editor = quillRef.current.getEditor();
        console.log(editor);
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = async () => {
            const file = input.files[0];
            if (/^image\//.test(file.type)) {
                console.log(file);
                const formData = new FormData();
                formData.append('image', file);
                console.log(`form data`, formData);
                alert('이미지는 서버가 구축된 다음 개발~');
                // const res = await ImageUpload(formData); // upload data into server or aws or cloudinary
                // const url = res?.data?.url;
                // editor.insertEmbed(editor.getSelection(), 'image', url);
            } else {
                alert('You could only upload images.');
            }
        };
    };

    const modules = useMemo(
        () => ({
            toolbar: {
                container: [
                    [{ header: [1, 2, 3, 4, 5, 6, false] }],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
                    ['image', 'link'],
                ],
                handlers: {
                    image: imageHandler,
                },
            },
        }),
        [],
    );

    return (
        <ReactQuill
            ref={quillRef}
            id={styles[id]}
            value={value}
            onChange={onChange}
            theme="snow"
            modules={modules}
        />
    );
}
