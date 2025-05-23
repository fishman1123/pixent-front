import {SerialNumberBox} from "../input/SerialNumberBox.jsx";
import {useEffect} from "react";
import {Outlet, useLocation, useNavigation} from "react-router-dom";
import {TopTextBox} from "../input/TopTextBox.jsx";


export const ReportViewer = () => {


    const navigate = useNavigation();
    const location = useLocation();
    const isChildRoute = location.pathname !== '/report'
    // useEffect(() => {
    //     history.pushState(null, '', '/');
    //     return () => {
    //         window.onpopstate = null;
    //     };
    // }, [navigate]);
    const dummyData = {
        "id": 451,
        "userName": "카리나",
        "perfumeName": "AC'SCENT17",
        "mainNote": "레몬페퍼",
        "mainNoteDesc": "상큼하면서도 스파이시한 향으로, 톡 쏘는 듯한 생동감이 특징입니다. 다른 시트러스 계열보다 더욱 매콤하고 강렬한 느낌을 주며, 레몬의 상큼함과 후추의 스파이시함이 절묘하게 어우러진 독특한 향입니다. 생동감 있는 첫 향에서 스파이시한 여운까지, 동양과 서양의 조화를 보여주는 매력적인 노트입니다.",
        "mainNoteAnalysis": "레몬페퍼의 상큼하면서도 스파이시한 향은 카리나 님의 강렬한 첫인상과 잘 어울립니다. 그녀의 또렷한 눈매와 매끈한 피부톤을 더욱 돋보이게 하며, 활기찬 에너지를 불어넣습니다.",
        "mainNoteImageUrl": "https://pixent-image.s3.ap-northeast-2.amazonaws.com/product/17-1.png",
        "middleNote": "인센스",
        "middleNoteDesc": "영적이고 심오한 스모키 향으로, 신비롭고 깊이 있는 향취가 특징입니다. 다른 스모키 계열보다 더욱 고귀하고 신비로운 느낌을 주며, 실크로드의 향신료 시장을 연상시키는 매혹적인 향입니다. 깊이 있는 스모키함과 영험한 분위기로, 동양의 신비로운 매력을 전달하는 시그니처 노트입니다.",
        "middleNoteAnalysis": "인센스의 심오하면서도 매혹적인 스모키 향은 카리나 님의 고양된 미래지향적 스타일과 멋지게 어울립니다. 메탈릭 의상과 조화를 이루어 그녀의 독창적인 스타일을 더욱 돋보이게 합니다.",
        "middleNoteImageUrl": "https://pixent-image.s3.ap-northeast-2.amazonaws.com/product/17-2.png",
        "baseNote": "오리스",
        "baseNoteDesc": "파우더리하고 은은한 플로럴 노트로, 섬세하고 고급스러운 향취가 특징입니다. 다른 플로럴 계열보다 더욱 파우더리하고 세련된 느낌을 주며, 부드러운 잔향으로 전체적인 향을 우아하게 마무리합니다. 클래식한 파우더리 향에 현대적인 감각을 더한 노트로, 세련된 여운을 남기는 완벽한 피니쉬입니다.",
        "baseNoteAnalysis": "오리스의 파우더리하고 섬세한 플로럴 노트는 카리나 님의 부드러운 곡선의 얼굴선과 조화를 이루며 전체적인 분위기를 은은하게 마무리해 줍니다.",
        "baseNoteImageUrl": "https://pixent-image.s3.ap-northeast-2.amazonaws.com/product/17-3.png",
        "appearance": {
            "facialFeature": "사진 속의 인물은 선명한 이목구비와 매끈한 피부톤을 자랑합니다. 특히, 또렷한 눈매와 길고 풍성한 속눈썹이 강조되어 눈에 띄는 강렬한 인상을 줍니다. 완벽히 균형 잡힌 얼굴형과 섬세한 메이크업이 조화를 이루며, 부드러운 곡선의 얼굴선과 깨끗한 피부가 전체적인 이미지의 조화를 돋보이게 합니다. 립스틱 색상은 자연스럽지만 눈부신 광택을 지닌 자연스러운 분홍색으로, 입술의 매력을 극대화하며 전체적인 화사함을 더합니다.",
            "style": "카리나 님의 스타일은 미래주의적 요소와 젊고 활기찬 에너지가 결합된 독창적인 스타일입니다. 이 이미지에서 그녀는 메탈릭 핑크와 블루를 적극 활용하여 독특한 분위기를 연출합니다. 메탈릭 재킷은 전체적인 톤을 부드럽게 중화시키며, 반짝이는 소재로 인해 시각적 흥미를 높입니다. 헤어스타일은 긴 생머리로 자연스러우면서도 부분적인 블루 염색이 독창적인 터치를 더합니다. 귀걸이와 같은 액세서리는 전체적인 메탈릭 스타일과 조화를 이루며, 손끝까지 세심하게 꾸며진 네일 아트는 그녀의 섬세한 취향을 드러냅니다.",
            "vibe": "전체적으로 강렬하면서도 명랑한 분위기가 돋보입니다. 카리나 님의 이미지에서 느껴지는 미래지향적 스타일과 자신감 넘치는 자세는 매우 인상적입니다. 조명과 의상의 조화는 마치 사이버 공간에서 막 튀어나온 듯한 신비로운 분위기를 자아내며, 그녀의 표정에서 보이는 강렬한 자신감과 에너지 넘치는 느낌은 사람들에게 강한 인상을 남깁니다. 전체적인 테마는 현대적이고 세련된 감각을 기반으로 하며, 독창적이면서도 대담한 스타일을 선호하는 모습을 보여줍니다."
        },
        "profile": "카리나 님의 외모는 매우 독특하고 현대적인 감각이 돋보입니다. 그녀의 선명한 이목구비와 매끄럽고 깨끗한 피부는 정교하게 꾸며진 스타일과 어우러져 매우 강렬한 인상을 남깁니다. 또한 그녀의 메탈릭 핑크와 블루 톤이 조화를 이뤄 미래지향적이면서도 독창적인 스타일을 연출합니다. 이와 같은 외모 분석 결과는 AC'SCENT17의 선택을 뒷받침합니다. 레몬페퍼의 상큼하면서도 스파이시한 향은 카리나 님의 강렬한 첫인상과 매우 잘 어울리며, 인센스의 심오한 스모키 향은 그녀의 독특한 미래지향적 스타일과 훌륭한 조화를 이룹니다. 마지막으로 오리스의 파우더리하고 섬세한 플로럴 노트는 그녀의 부드러운 얼굴선과 잘 어울려 전체적인 분위기를 은은하게 마무리해 줍니다.\n\nAC'SCENT17은 독특하면서도 강렬한 매력을 가진 카리나 님에게 완벽한 향수입니다. 현대적이고 세련된 감각을 가지고 있는 이 향수는 그녀의 독창적이고 대담한 스타일을 더욱 돋보이게 합니다. 레몬페퍼의 활기찬 첫인상, 인센스의 심오한 스모키함, 그리고 오리스의 파우더리한 마무리는 그녀의 강렬한 눈매와 매끄러운 피부톤을 강조하며, 전체적인 스타일을 완벽하게 완성합니다. 특히 갤러리 오프닝, 재즈바, 문화예술 공간에서 카리나 님의 매력을 극대화할 수 있으며, 밤이 깊어질수록 더욱 빛을 발할 것입니다. AC'SCENT17은 그녀와 같은 젊은 세대들에게 자신만의 독특한 개성을 향수로 표현할 수 있는 완벽한 선택이 될 것입니다.",
        "userImageUrl": "https://pixent-image.s3.ap-northeast-2.amazonaws.com/user/2024-11-24-14-22-16-%EC%B9%B4%EB%A6%AC%EB%82%98.jpg",
        "citrus": 60,
        "floral": 10,
        "woody": 80,
        "musk": 30,
        "fruity": 10,
        "spicy": 70,
        "uuid": "xxxxxxxxx"
    }

    return (
        <div>
            {!isChildRoute && <TopTextBox/>}
            {!isChildRoute && <SerialNumberBox path='/report' isViewer={true} />}
            <Outlet />
        </div>
    )
}