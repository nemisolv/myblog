import AboutMe from '~/components/AboutMe';
import FeaturePost from '~/components/FeaturePost';
import HotPost from '~/components/HotPost';
import NewestPost from '~/components/NewestPost';

function Home() {
    return (
        <div className="mt-10 ">
            <NewestPost />
            <HotPost/>
            <FeaturePost />
            
            <AboutMe />
        </div>
    );
}

export default Home;
