export async function deleteCourse(id: number){

    const res = await fetch("http://localhost:3000/api/admin/course/by-id", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({id})
    })
    
    console.log(await res.json());
    
}