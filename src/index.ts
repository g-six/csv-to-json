import { readFileSync } from 'fs'
type JsonResponse = {
    [key: string]: boolean | string | number | [string[]]
}
function main(filename: string): Record<string, JsonResponse[]> {
    const body = readFileSync(filename, {
        encoding: 'utf8',
        flag: 'r'
    })

    
    const docs = csvToArray(body)
    return { docs }
}
function csvToArray(contents: string, delimiter: string = ','): JsonResponse[] {
    let keys: string[] = []
    let i = 0
    let data: JsonResponse[] = []
    contents.split('\n').forEach((row: string) => {
        if (keys.length == 0) {
            keys = row.split(delimiter)
        } else {
            const values = row.split(delimiter)
            if (values.length === keys.length) {
                let row_obj: JsonResponse = {}
                keys.forEach((key: string, idx: number) => {
                    row_obj[key] = values[idx]
                })
                data.push(row_obj)
            }
        }
    })
    return data
}

const [filename] = process.argv.slice(2) as unknown as string[]

export default main
