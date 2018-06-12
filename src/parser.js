export default (xml) => {
  const items = [...xml.querySelectorAll('item')];

  const itemsData = items.map((item) => {
    const title = item.querySelector('title').textContent;
    const descriptionElement = item.querySelector('description');
    const description = descriptionElement ? descriptionElement.textContent : '';
    const link = item.querySelector('link').innerHTML;
    return { title, description, link };
  });

  return itemsData;
};
