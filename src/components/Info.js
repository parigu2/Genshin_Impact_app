import React from 'react'

import { Container, Divider, List, Header, Segment } from 'semantic-ui-react'

const Info = () => {
    return (
        <Segment style={{ minWidth: 550 }}>
            <Container style={{ fontFamily: 'Noto Sans CJK KR', fontSize: 16 }}>
                <Header style={{ fontFamily: 'Noto Sans CJK KR', fontSize: 36 }}>About us</Header>
                <List>
                    <List.Item as='a' href='https://open.kakao.com/o/stghvimc' target="_blank" icon='address card outline' content='카카오톡' style={{ fontFamily: 'Noto Sans CJK KR', fontSize: 24 }} />
                </List>
                <p>원신을 좋아하는 한 평범한 개발자인 DevCarp입니다.  성유물 옵션이나 무기 등을 고려할 때 조금이나마 도움이 되고자 하여 이 앱을 개발하게 되었습니다.  사용하시던 중에 어떠한 오류나 개선사항, 추후 생겼으면 하는 기능들이 있으시면 상단의 카카오톡 오픈링크로 의견 보내주시면 감사하겠습니다.</p>
                <List style={{ fontFamily: 'Noto Sans CJK KR', fontSize: 14 }}>
                    <List.Item icon='compass outline' content='예정된 업데이트' style={{ fontFamily: 'Noto Sans CJK KR', fontSize: 24 }} />
                    <List.Item content='방어력에 따른 데미지 계산식 추가 (알베도 E/노엘 E)' />
                    <List.Item content='초전도, 확산등에 대한 방어력/내성 감소 계산식 추가' />
                    <List.Item content='데미지 계산식에 대한 성유물 옵션 추가' />
                    <List.Item content='데미지 계산식에 대한 무기 옵션 추가' />
                    <List.Item content='성유물 및 무기 비교 시뮬레이션 (2 or more)' />
                    <List.Item content='추천 파티조합 페이지' />
                    <List.Item content='정보 공유방' />
                </List>
            </Container>
            <Divider />
            <Container>
                <Header style={{ fontFamily: 'Noto Sans CJK KR', fontSize: 36 }}>Credit</Header>
                <List style={{ fontFamily: 'Noto Sans CJK KR', fontSize: 14 }}>
                    <List.Item as='a' href='https://genshin.honeyhunterworld.com/' target="_blank" content='Honey Hunter World' />
                    <List.Item as='a' href='https://genshin-impact.fandom.com/wiki/Wiki' target="_blank" content='Genshin Impact Wiki' />
                    <List.Item as='a' href='https://cafe.naver.com/genshin/309660' target="_blank" content='네이버 원신 까페 SIGLD님의 글 - (정리) 한눈에 보는 몬스터 속성 저항 정보' />
                    <List.Item content='원신 아메리카 서버 - Tyou' />
                    <List.Item content='원신 아메리카 서버 - 시아' />
                    <List.Item content='원신 아메리카 서버 - EunA' />
                </List>
            </Container>
            <Divider />
            <Container>
                <Header style={{ fontFamily: 'Noto Sans CJK KR', fontSize: 36 }}>개발노트</Header>
                <List style={{ fontFamily: 'Noto Sans CJK KR', fontSize: 14 }}>
                    <List.Item icon='calendar alternate outline' content='2021/01/17' style={{ fontFamily: 'Noto Sans CJK KR', fontSize: 24 }} />
                    <List.Item content='데미지 계산기 추가' />
                    <List.Item content='물리/원소 계산식 추가' />
                    <List.Item content='원소반응 배율 추가' />
                    <List.Item content='각 스킬별 데미지 도표 추가' />
                    <List.Item content='각 원신 케릭터 추가' />
                    <List.Item content='몬스터 일부 추가 (츄츄족/유적 가디언/우인단)' />
                </List>
            </Container>
        </Segment>
    )
}

export default Info
