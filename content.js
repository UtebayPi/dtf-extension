function hideAndAddReactions() {
    document.querySelectorAll('.reactions').forEach(reactionsDiv => {
        const firstReactionButton = reactionsDiv.querySelector('.reaction-button');
        if (firstReactionButton) {
            if(firstReactionButton.querySelector('.reaction-button__dummy')) return;
            const reactionButtonClone = firstReactionButton.cloneNode(true);
            reactionsDiv.style.display = 'none'; // Hide the original div

            Object.assign(reactionButtonClone.style, {
                minWidth: '70px',
                width: 'min-content'
            });

            const originalImg = reactionButtonClone.querySelector('img');
            if (originalImg) {
                const arrowImg = document.createElement('img');
                arrowImg.src = 'https://www.svgrepo.com/show/93813/up-arrow.svg'; // Up-pointing arrow SVG data URL
                arrowImg.alt = 'Up arrow';
                arrowImg.style.width = '15px';
                reactionButtonClone.replaceChild(arrowImg, originalImg);
            }

            // Add the reaction button after the div if it doesn't already exist
            if (!reactionsDiv.nextElementSibling || !reactionsDiv.nextElementSibling.classList.contains('reaction-button')) {
                reactionsDiv.parentNode.insertBefore(reactionButtonClone, reactionsDiv.nextSibling);

                // Add click event listener to the cloned button
                reactionButtonClone.addEventListener('click', () => {
                    firstReactionButton.click();
                });

                // Function to update the clone based on the original button's classes
                function updateClone() {
                    if (firstReactionButton.classList.contains('reaction-button--active')) {
                        reactionButtonClone.classList.add('reaction-button--active');
                    } else {
                        reactionButtonClone.classList.remove('reaction-button--active');
                    }
                    const originalSpan = firstReactionButton.querySelector('span');
                    const cloneSpan = reactionButtonClone.querySelector('span');
                    if (originalSpan && !cloneSpan) {
                        reactionButtonClone.appendChild(originalSpan.cloneNode(true))
                    }
                    if (!originalSpan && cloneSpan) {
                        cloneSpan.remove();
                    }
                    if (originalSpan && cloneSpan){
                        cloneSpan.textContent = originalSpan.textContent;
                    }
                }

                // Initial update
                updateClone();

                // Observe changes to the original button and update the clone
                const observer = new MutationObserver(updateClone);

                observer.observe(firstReactionButton, { attributes: true, attributeFilter: ['class'] });
            }
        }
    });
}

// Execute the function every 1 second (1000 milliseconds)
setInterval(hideAndAddReactions, 500);