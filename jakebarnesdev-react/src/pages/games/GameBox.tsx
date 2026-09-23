import './GameBox.css'

const images = import.meta.glob(
  '../../assets/game_boxes/*.webp',
  { eager: true, query: '?url', import: 'default' }
);

export function GameBox({ link, imageName, altText }: { link: string; imageName: string; altText: string }) {
    return (
        <div className="game_box">
            <a href={link}>
                <img src={images[`../../assets/game_boxes/${imageName}.webp`]} alt={altText} />
            </a>
        </div>
    );
}