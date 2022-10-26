
export interface ISearchBox extends React.ComponentPropsWithoutRef<'input'> {}

const SearchBox: React.FC<ISearchBox> = ({ className, ...inputProps }) => {
    return (
        <>
            <input 
                className="w-full md:w-96 h-12 rounded-2xl px-5 border-b-2 border-gray-300 focus:outline-none focus:border-blue-600"
                placeholder="Search..."
            />
        </>
    );
};

export default SearchBox;