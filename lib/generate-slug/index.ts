export default async function generateSlug(str: string) {
    str = str.toLowerCase();
    str = str.replace(/^\s+|\s+$/g, '') // trim leading/ trailing white space
        .replace(/[^a-z0-9 -]/g, '') // remove any non-alphanumeric characters
        .replace(/\s+/g, '-')// replace spaces with hyphens
        .replace(/-+/g, '-');// remove consecutive hyphens

    return str
}