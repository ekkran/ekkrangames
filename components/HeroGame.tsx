import Image from "next/image";
import OscarIcon from "@/public/HeroImages/OscarIcon.png"

const HeroGame = () => {
    return (
        <div className="min-h-screen bg-[url('../public/HeroImages/HeroGameMobil.png')] bg-center bg-no-repeat bg-cover lg:bg-[url('../public/HeroImages/HeroGame.png')] sm:bg-cover">
            <div className="container mx-auto flex-col min-h-max columns-3xl items-center space-y-4 py-24">
                <div className="size-64 mx-auto relative">
                    <Image className="object-contain" src={OscarIcon} alt="GameIcon" fill={true} ></Image>
                </div>
                <h2 className=" text-6xl font-bold text-center text-atoll-100">Oscar</h2>
                <div className=" my-10">
                    <p className=" text-lg text-atoll-100 text-center">
                        Discover the secrets of an unkown planet while Oscar fights his inner demons
                    </p>
                </div>
                <div className="py-12 flex justify-center">
                    <a className="bg-atoll-900 text-atoll-50 p-4 rounded-sm font-semibold" href="https://ekkran.itch.io/the-wedding-of-oscar">Play on Itch.io</a>
                </div>
            </div>
        </div>
    );
}

export default HeroGame;