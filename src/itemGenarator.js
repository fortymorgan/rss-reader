export default ({ description, link, title }) => `<a href="${link}" class="list-group-item-action flex-column align-items-start" target="_blank">
<h5 class="mb-1">${title}</h5>
<p class="mb-1">${description}</p>
</a>
<button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#modal">More...</button>`;
