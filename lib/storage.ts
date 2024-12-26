export interface Drawing {
  id: string
  name: string
  createdAt: string
  updatedAt: string
  svg?: string
}

export function createDrawing(id: string) {
  const drawings = getDrawings()

  const newDrawing: Drawing = {
    id: id,
    name: `Draft-${id}`,
    createdAt: new Date().toLocaleString(),
    updatedAt: new Date().toLocaleString(),
  }

  drawings.push(newDrawing)
  localStorage.setItem('drawings-data', JSON.stringify(drawings))

}

export function saveDrawing(name: string, id: string) {
  const drawings = getDrawings()

  const drawingToUpdate = drawings.find(d => d.id === id)
  if (drawingToUpdate) {
    drawingToUpdate.name = name
    drawingToUpdate.updatedAt = new Date().toLocaleString()
    localStorage.setItem('drawings-data', JSON.stringify(drawings))
  }
}

export function getDrawings(): Drawing[] {
  const drawings = localStorage.getItem('drawings-data')
  return drawings ? JSON.parse(drawings) : []
}

export function getDrawingById(id: string): Drawing | undefined {
  const drawings = getDrawings()
  return drawings.find(drawing => drawing.id === id)
}

export function deleteDrawing(id: string) {
  const drawings = getDrawings()
  const filteredDrawings = drawings.filter((drawing) => drawing.id !== id)
  localStorage.setItem('drawings-data', JSON.stringify(filteredDrawings))
}
