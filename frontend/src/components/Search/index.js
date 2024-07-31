import { useCallback, useEffect, useState } from 'react';
import HeadlessTippy from '@tippyjs/react/headless';
import { Wrapper as PoperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import PostItemSummary from '../PostItemSummary';
import { axiosPublic } from '~/config/axiosConfig';
import { debounce } from 'lodash';

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [userSearchResult, setUserSearchResult] = useState([]);
    const [postSearchResult, setPostSearchResult] = useState([]);
    const [showResults, setShowResults] = useState(true);

    // Debounce the function that handles the change of search value
    const debouncedSearch = useCallback(
        debounce((value) => {
            setSearchValue(value);
        }, 1000),
        [],
    );

    useEffect(() => {
        if (!searchValue.trim()) {
            setUserSearchResult([]);
            setPostSearchResult([]);
            return;
        }
        const search = async () => {
            const [userResponse, postResponse] = await Promise.all([
                axiosPublic.get(`/users`, { params: { q: searchValue } }),
                axiosPublic.get(`/posts`, { params: { q: searchValue } }),
            ]);
            setUserSearchResult(userResponse.data.data);
            setPostSearchResult(postResponse.data.data);
        };
        search();
    }, [searchValue]);

    // Handle input change
    const handleInputChange = (event) => {
        const { value } = event.target;
        debouncedSearch(value); // This will delay updating the searchValue state
    };

    return (
        <HeadlessTippy
            visible={showResults && (userSearchResult?.length > 0 || postSearchResult?.length > 0)}
            placement="bottom"
            interactive
            onClickOutside={() => setShowResults(false)}
            render={(attrs) => (
                <div className="w-[265px] " tabIndex="-1" {...attrs}>
                    <PoperWrapper>
                        {userSearchResult && userSearchResult.length > 0 && (
                            <>
                                <h4 className="font-semibold text-lightGray mb-2 ml-2 ">Accounts</h4>
                                {userSearchResult.map((user) => (
                                    <AccountItem
                                        key={user.id}
                                        user={user}
                                        onClick={() => setShowResults(false)}
                                    />
                                ))}
                            </>
                        )}

                        {postSearchResult && postSearchResult.length > 0 && (
                            <>
                                <h4 className="font-semibold text-lightGray mb-2 ml-2 ">Posts</h4>
                                {postSearchResult.map((post) => (
                                    <PostItemSummary
                                        key={post.id}
                                        post={post}
                                        onClick={() => setShowResults(false)}
                                    />
                                ))}
                            </>
                        )}
                    </PoperWrapper>
                </div>
            )}
        >
            <div className="relative">
                <input
                    type="text"
                    placeholder="Search any post or user..."
                    className="border border-slate-300 py-3 px-5 outline-none rounded-lg pr-12 input-search caret-primary"
                    onFocus={() => setShowResults(true)}
                    onChange={handleInputChange}
                />

                <span className="absolute translate-y-2/4 right-0 text-slate-400 px-4 ">
                    {/* You can include your search icon here */}
                </span>
            </div>
        </HeadlessTippy>
    );
}

export default Search;
