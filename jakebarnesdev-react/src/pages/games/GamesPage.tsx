import { Logo } from '../../components/Logo';
import { GameBox } from './GameBox';
import './GamesPage.css'

export function GamesPage() {
    return (
        <>
            <Logo />
            <div className="game_boxes">
                <GameBox link="https://jakebarnes.itch.io/cxr" imageName="ChickensXROAD" altText="Chicken(s) X ROAD" />
                <GameBox link="https://jakebarnes.itch.io/alpha" imageName="Alpha" altText="Alpha" />
                <GameBox link="https://jakebarnes.itch.io/boosty-loops-blueprint" imageName="BoostyLoopsBlueprint" altText="Boosty Loops Blueprint" />
                <GameBox link="https://zuhairghias.itch.io/minion-no1067809362" imageName="Minion" altText="Minion" />
                <GameBox link="https://zuhairghias.itch.io/bug-bash" imageName="Bug Bash" altText="Bug Bash" />
                <GameBox link="https://jakebarnes.itch.io/mantis-man" imageName="Mantis Man" altText="Mantis Man" />
                <GameBox link="https://zuhairghias.itch.io/raising-the-bread" imageName="RaisingTheBread" altText="Raising The Bread" />
                <GameBox link="https://jakebarnes.itch.io/scp-6787" imageName="SCP6787" altText="SCP-6787" />
                <GameBox link="https://escapeteam.itch.io/escape" imageName="Escape" altText="Escape" />
                <GameBox link="https://jakebarnes.itch.io/bullet-haven" imageName="BulletHaven" altText="Bullet Haven" />
                <GameBox link="https://jakebarnes.itch.io/primary-prisms" imageName="Primary Prisms" altText="Primary Prisms" />
                <GameBox link="https://jakebarnes.itch.io/space-on-the-page" imageName="SOTP" altText="Space On The Page" />
                <GameBox link="https://gamejolt.com/games/fnaftd/394446" imageName="FNAFTD" altText="FNAF Tower Defense" />
                <GameBox link="https://jakebarnes.itch.io/ptfr" imageName="PTFR" altText="Paint The Floor Red" />
                <GameBox link="https://gamejolt.com/games/onaw/234439" imageName="ONAW" altText="One Night at Waygetter" />
                <GameBox link="https://jakebarnes.itch.io/amity-tower" imageName="Amity Tower" altText="Amity Tower" />
                <GameBox link="https://jakebarnes.itch.io/n13" imageName="Neighborhood_13" altText="Neighborhood 13" />
            </div>
        </>
    );
}