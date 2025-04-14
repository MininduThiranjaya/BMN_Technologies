import BannerImages from "./BannerImages";
import NavBar from "./NavBar";

function Header({ refs } : any) {
    const { introRef, servicesRef, contactRef, aboutRef } = refs;
    return (
        <div className=""> {/* or the exact height of the banner */}
            {/* NavBar stays stuck to the top */}
                <NavBar refs={{ introRef, servicesRef, contactRef, aboutRef }}/>
            {/* Banner image placed with margin from top */}
                <BannerImages />
        </div>
    )
}

export default Header