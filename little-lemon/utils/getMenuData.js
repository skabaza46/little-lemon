
ENDPOINT_URL = "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json"

export const MenuData = async () => {


    const response = await fetch(ENDPOINT_URL)
    const data = await response.json()

    let newMenuData = []
    data.menu.map((item, index)=>{
        const image_name = item.image == "lemonDessert.jpg" ? "lemonDessert 2.jpg" : item.image

        const image_url = `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${image_name}?raw=true`

       item["image"] = image_url
       item["id"] = index
       item["title"] = item.name
       item["description"] = item.description.replace("'","")

       newMenuData.push(item)

    })

    return newMenuData

}