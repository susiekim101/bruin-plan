import type { MajorOption } from '../../types.ts';

interface handleSearchProps {
    event: React.ChangeEvent<HTMLInputElement>,
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>
}

export function handleSearch ({ event, setSearchTerm }: handleSearchProps) {
    setSearchTerm(event.target.value);
};

interface handleFilterProps {
    option: MajorOption | null,
    setSelectedMajor: React.Dispatch<React.SetStateAction<MajorOption | null>>
}

export function handleFilter ({ option, setSelectedMajor }: handleFilterProps) {
    setSelectedMajor(option);
};