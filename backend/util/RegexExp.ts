const RegexEscaper = (text: string, flag: string) => new RegExp(text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'), flag)

export default RegexEscaper