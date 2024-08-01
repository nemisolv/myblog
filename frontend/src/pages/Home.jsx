import AboutMe from '@/components/AboutMe';
import FeaturePost from '@/components/Post/FeaturePost';
import HotPost from '@/components/Post/HotPost';
import NewestPost from '@/components/NewestPost';

function Home() {
    return (
        <div className="mt-10 ">
            <NewestPost />
            <HotPost />
            <FeaturePost />
            <AboutMe />
        </div>
    );
}

export default Home;
