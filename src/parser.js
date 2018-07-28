export default (xml) => {
  const lastBuildDate = xml.querySelector('lastBuildDate');
  const lastUpdate = new Date(lastBuildDate.textContent);

  const items = [...xml.querySelectorAll('item')];

  const feedTitle = xml.querySelector('title').textContent;

  const itemsData = items.map((item) => {
    const title = item.querySelector('title').textContent;
    const descriptionElement = item.querySelector('description');
    const description = descriptionElement ? descriptionElement.textContent : '';
    const link = item.querySelector('link').innerHTML;
    return { title, description, link };
  });

  return { itemsData, lastUpdate, feedTitle };
};
