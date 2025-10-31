const getDefaultImg =(gender:'male'|'female')=>{

const string = gender.toLowerCase()==='male'? '/default/boy.png': '/default/girl.png'
// const string = `https://avatar.iran.liara.run/public/${gender.toLowerCase()==='male'?'boy':'girl'}`
return string
}
export  default getDefaultImg