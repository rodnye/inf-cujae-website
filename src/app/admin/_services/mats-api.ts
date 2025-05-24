export async function fetchMaterials() {
  const response = await fetch('/api/mats');
  if (!response.ok) {
    throw new Error('Error al obtener los materiales');
  }
  return response.json();
}

export async function uploadMaterial(
  file: File,
  onProgress?: (progress: number) => void,
) {
  const formData = new FormData();
  formData.append('file', file);

  return new Promise<{ message: string }>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/upload');

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable && onProgress) {
        const progress = Math.round((event.loaded / event.total) * 100);
        onProgress(progress);
      }
    };

    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(JSON.parse(xhr.responseText));
      } else {
        reject(new Error(xhr.statusText));
      }
    };

    xhr.onerror = () => reject(new Error('Error de red'));
    xhr.send(formData);
  });
}

export async function deleteMaterial(filename: string) {
  const response = await fetch(`/api/mats/${filename}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Error al eliminar el archivo');
  }
  return response.json();
}
