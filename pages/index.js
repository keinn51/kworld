import '@/styles/global/global.scss';

// index.js
export default function Home() {
    return (
        <div>
            <div>
                <a>resume</a>
            </div>
            <div>
                <a>portfolio</a>
            </div>
            <div>
                <a>think</a>
                <span>나의 생각들</span>
            </div>
            <div>
                <a>favorite</a>
                <span>취미, 좋아하는 것 등</span>
            </div>
            <div>
                <a>wisdom</a>
                <span>TIL 중 저장해두고 싶은 것들</span>
            </div>
            <div>
                <a>toy</a>
                <span>내가 공부하거나 재미로 만들어 본 것들</span>
            </div>
            <div>
                <a>til</a>
                <span>문득 떠오르는 생각, 오늘 배운 것, 메모장 등등의 역할</span>
            </div>
        </div>
    );
}
