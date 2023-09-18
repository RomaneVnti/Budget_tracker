import '../../style/homePage/DropDownMenu.css';

export default function DropdownMenuDropdownMenuDashboard({ isOpen}) {
    // Utilisez la valeur de isOpen pour décider si la liste doit être affichée ou non
    const dropdownClass = isOpen ? 'dropdown-menu active' : 'dropdown-menu';
  
    return (
      <ul className={dropdownClass}>
        <li><a href="/homePage">Accueil</a></li>
        <li><a href="/transaction">Transactions</a></li>
        <li><a href="/statistiques">Statistiques</a></li>
        <li><a href="/paramètres">Paramètres</a></li>
        <li><a href="/login">Déconnection</a></li>
      </ul>
    );
  }
