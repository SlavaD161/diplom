const Input = ({leftIcon, rightIcon, placeholder, value, setValue, onSearch}) => {
    return (
        <label style={{boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.15)", outline: "0", border: 0}} 
            className="input rounded-r-none min-w-0 w-full md:w-80 h-[48px] rounded-[12px] hover:bg-gray-50 flex items-center gap-2">

            {leftIcon}

            <input 
                onKeyDown={e => {
                    if (e.keyCode == 13) {
                        onSearch()
                    }
                }}
                onChange={e => setValue(e.target.value)}
                value={value}
                type="text" 
                className="font-[500] ml-[5px] min-w-0 w-full text-[15px] placeholder:text-[#9B9B9B]" placeholder={placeholder} 
            />

            {rightIcon}

        </label>
    )
}

export default Input