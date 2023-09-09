import 'react-quill/dist/quill.snow.css';
import ReactQuill, { Quill } from 'react-quill';
import styles from '@/styles/components/QuillEditor.module.scss';
import { useMemo, useRef } from 'react';
import axios from 'axios';
import { postImage } from '@/data/imageApi';

export default function QuillEditor({
    id = '',
    value = '',
    onChange = () => {},
    onBlur = () => {},
}) {
    const quillRef = useRef();

    // 이미지 처리를 하는 핸들러
    const imageHandler = () => {
        // 이미지를 저장할 input type=file DOM을 만든다.
        const input = document.createElement('input');
        // 속성 써주기
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*, video/*');
        input.click(); // 에디터 이미지버튼을 클릭하면 이 input이 클릭된다.
        // input이 클릭되면 파일 선택창이 나타난다.

        // input에 변화가 생긴다면 = 이미지를 선택
        input.addEventListener('change', async () => {
            const file = input.files[0];
            // multer에 맞는 형식으로 데이터 만들어준다.
            const formData = new FormData();
            formData.append('userfile', file); // formData는 키-밸류 구조
            // 백엔드 multer라우터에 이미지를 보낸다.
            try {
                const result = await postImage(formData);
                console.log('성공 시, 백엔드가 보내주는 데이터', result.url);
                const IMG_URL = result.url;
                const editor = quillRef.current.getEditor(); // 에디터 객체 가져오기

                // 현재 에디터 커서 위치값을 가져온다
                const range = editor.getSelection();
                // 가져온 위치에 이미지를 삽입한다
                editor.insertEmbed(range.index, 'image', IMG_URL);
            } catch (error) {
                console.error('이미지 업로드 실패');
            }
        });
    };

    const modules = useMemo(
        () => ({
            toolbar: {
                container: [
                    [{ header: [1, 2, 3, 4, 5, 6, false] }],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
                    ['image', 'link', 'code', 'video'],
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
            onBlur={() => {
                onBlur(value);
            }}
            theme="snow"
            modules={modules}
        />
    );
}
