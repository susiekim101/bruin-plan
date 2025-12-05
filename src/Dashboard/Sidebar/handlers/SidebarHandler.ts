import type { MajorOption } from '../../types.ts';

interface handleSearchProps {
    event: React.ChangeEvent<HTMLInputElement>,
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>
}

export function handleSearch ({ event, setSearchTerm }: handleSearchProps) {
    setSearchTerm(event.target.value);
};

interface handleSelectProps {
    option: MajorOption | null,
    setSelectedMajor: React.Dispatch<React.SetStateAction<MajorOption | null>>
}

export function handleSelect ({ option, setSelectedMajor }: handleSelectProps) {
    setSelectedMajor(option);
};