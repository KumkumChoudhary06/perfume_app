fetch("perfume.json")
  .then(res => res.json())
  .then(perfumes => {
    const results = document.getElementById("results");
    const topSelect = document.getElementById("topNote");
    const middleSelect = document.getElementById("middleNote");
    const baseSelect = document.getElementById("baseNote");
    const searchBtn = document.getElementById("searchBtn");
    const resetBtn = document.getElementById("resetBtn");

    // Collect unique notes
    const topNotes = new Set();
    const middleNotes = new Set();
    const baseNotes = new Set();

    perfumes.forEach(p => {
      p.top.forEach(n => topNotes.add(n));
      p.middle.forEach(n => middleNotes.add(n));
      p.base.forEach(n => baseNotes.add(n));
    });

    function fillOptions(select, notes) {
      notes.forEach(note => {
        const option = document.createElement("option");
        option.value = note;
        option.textContent = note;
        select.appendChild(option);
      });
    }

    // Populate dropdowns
    fillOptions(topSelect, topNotes);
    fillOptions(middleSelect, middleNotes);
    fillOptions(baseSelect, baseNotes);

    // Display perfumes
    function displayPerfumes(list) {
      results.innerHTML = "";
      if (list.length === 0) {
        results.innerHTML = "<p>No perfumes match your selection.</p>";
        return;
      }
      list.forEach(p => {
        const card = document.createElement("div");
        card.classList.add("perfume-card");
        card.innerHTML = `
          <img src="${p.image}" alt="${p.name}">
          <div class="perfume-info">
            <h2>${p.name}</h2>
            <p>${p.description}</p>
            <p><strong>Top Notes:</strong> ${p.top.join(", ")}</p>
            <p><strong>Middle Notes:</strong> ${p.middle.join(", ")}</p>
            <p><strong>Base Notes:</strong> ${p.base.join(", ")}</p>
          </div>
        `;
        results.appendChild(card);
      });
    }

    // Filtering logic
    function filterPerfumes() {
      const topNote = topSelect.value;
      const middleNote = middleSelect.value;
      const baseNote = baseSelect.value;

      const filtered = perfumes.filter(p => {
        return (
          (!topNote || p.top.includes(topNote)) &&
          (!middleNote || p.middle.includes(middleNote)) &&
          (!baseNote || p.base.includes(baseNote))
        );
      });

      displayPerfumes(filtered);
    }

    // Event Listeners
    searchBtn.addEventListener("click", filterPerfumes);
    resetBtn.addEventListener("click", () => {
      topSelect.value = "";
      middleSelect.value = "";
      baseSelect.value = "";
      results.innerHTML = "";
    });

    // Also update instantly when selecting
    topSelect.addEventListener("change", filterPerfumes);
    middleSelect.addEventListener("change", filterPerfumes);
    baseSelect.addEventListener("change", filterPerfumes);
  })
  .catch(err => console.error("Failed to load perfumes:", err));
