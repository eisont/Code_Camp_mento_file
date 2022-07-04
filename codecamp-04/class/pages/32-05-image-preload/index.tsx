import { useEffect, useRef, useState } from "react";

export default function ImagePreloadPage() {
    const [myLoadedImage, setMyLoadedImage] = useState<HTMLImageElement>();
    const [loaded, setLoaded] = useState(false);
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const img = new Image();
        img.src = "https://codebootcamp.co.kr/images/main/homeImage1.webp";
        img.onload = () => {
            setMyLoadedImage(img);
        };
    }, []);

    function onClickButtonPreload() {
        if (myLoadedImage) divRef.current?.appendChild(myLoadedImage);
    }

    function onClickButtonLoad() {
        setLoaded(true);
    }

    return (
        <>
            <h1>안녕하세요 사이트에 오신것을 환영합니다!!!</h1>
            ============================================================
            <div ref={divRef}></div>
            <button onClick={onClickButtonPreload}>이미지 프리로드</button>
            ============================================================
            {loaded && (
                <img src="https://codebootcamp.co.kr/images/main/homeImage1.webp" />
            )}
            <button onClick={onClickButtonLoad}>이미지 로드</button>
            ============================================================
        </>
    );
}
