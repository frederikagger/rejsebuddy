const getAge = (birthday: Date) => {
    return (
        new Date(new Date().getTime() - new Date(birthday).getTime()).getFullYear() - 1970
    )
}

export default getAge