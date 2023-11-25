import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faX } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import clsx from 'clsx';
import style from './style.module.scss'
import { Wrapper as PopperWrapper } from '../Popper';
import { PopperItem } from '../ProductItem';
import { useEffect, useRef, useState } from 'react';
import * as productService from '../../api/productServices';
import { useDebounce } from '~/hooks';
function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(null);
    const inputRef = useRef();
    const debounce = useDebounce(searchValue, 500);
    useEffect(() => {
        const Search = async () => {
            if (debounce != '') {
                const result = await productService.productSearch(debounce);
                if (result.length > 0) {
                    setSearchResult(result);
                    setLoading(true);
                } else {
                    setSearchResult([]);
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };
        Search();
    }, [debounce]);
    return (
        <div>
            <Tippy
                interactive
                visible={loading && searchResult.length > 0}
                render={(attrs) => (
                    <div className={clsx(style.searchResult)} tabIndex={-1} {...attrs}>
                        <PopperWrapper>
                            <h6 className="ms-2">Sản phẩm</h6>
                            {searchResult.map((e, index) => (
                                <PopperItem key={index} data={e} />
                            ))}
                        </PopperWrapper>
                    </div>
                )}
            >
                <div className={clsx(style.search)}>
                    <div className={clsx(style.iconSearch)}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </div>
                    <input
                        type="text"
                        placeholder="Tên sản phẩm"
                        name="search"
                        spellCheck={false}
                        ref={inputRef}
                        value={searchValue}
                        onBlur={() => {
                            setTimeout(() => {
                                setLoading(false);
                            }, 100);
                        }}
                        onFocus={() => {
                            setLoading(true);
                        }}
                        onChange={(e) => {
                            setSearchValue(e.target.value);
                        }}
                    />
                    <div
                        className="icon-close"
                        onClick={() => {
                            setSearchResult([]);
                            setSearchValue('');
                            inputRef.current.focus();
                        }}
                    >
                        <FontAwesomeIcon icon={faX} />
                    </div>
                </div>
            </Tippy>
        </div>
    );
}

export default Search;
