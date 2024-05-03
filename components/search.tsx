"use client"
import FilterAutor from '@/app/Combobox/Filters/FilterAutor';
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';

const Search = () => {

    const searchParams = useSearchParams()!;
    const [search, setSearch] = useState(searchParams.get('search') || '');

    const router = useRouter();

    function Pesquisa() {
        const params = new URLSearchParams(searchParams);

        if (search) params.append('search', search);

        const query = params.size ? params.toString() : '';
        router.push('/paginas/autor?' + query);
    }

    return (
        <div className="flex items-center justify-between">
            <form onSubmit={Pesquisa} className="flex flex-1 items-center space-x-2">
                <Input
                    type='hidden'
                    id="search"
                    name="search"
                    placeholder="Filter..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="h-8 w-[150px] lg:w-[250px]"
                />
                <FilterAutor width="300px" onAutorSelect={setSearch} />
                <Button type="submit">Pesquisar</Button>
            </form>
        </div>
    )
};

export default Search;