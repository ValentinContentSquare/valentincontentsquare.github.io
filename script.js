function submitFeedback() {
    const feedback = document.getElementById('feedback').value;
    heap.identify(feedback);
    alert('Thank you for your feedback: ' + feedback);
}